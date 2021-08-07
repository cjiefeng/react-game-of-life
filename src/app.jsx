import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import produce from 'immer';


// ttt

const numRows = 50;
const numCols = 50;  

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const randomGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0)));
  }
  return rows;
}

const resetGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
}

const App = () => {  
  const [grid, setGrid] = useState(() => {
    return resetGrid();
  });
  
  const [running, setRunning] = useState(false);
  
  const runningRef = useRef(running);
  runningRef.current = running;
  
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const tempI = (i + x) >= 0 ? (i + x) % numRows : numRows + (i + x);
              const tempJ = (j + y) >= 0 ? (j + y) % numCols : numCols + (j + y);
              if (tempI >= 0 && tempI < numRows && tempJ >= 0 && tempJ < numCols) {
                neighbours += g[tempI][tempJ];
              }
            });
            
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbours === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    
    setTimeout(runSimulation, 300);
  }, []);
  
  return (
    <>
    <button
      onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}>
      {running ? 'Stop' : 'Start'}
    </button>
    <button
      onClick={() => {
        setGrid(randomGrid());
      }}>
      Random
    </button>
    <button
      onClick={() => {
        setGrid(resetGrid());
      }}
    >
      Reset
    </button>
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}
    >
      {grid.map((rows, i) => 
        rows.map((cols, j) => ( 
          <div 
            key={`${i}-${j}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20, 
              height: 20, 
              backgroundColor: grid[i][j] ? 'pink' : undefined,
              border: 'solid 1px black'
            }} 
          /> 
        ))
      )}
    </ div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
