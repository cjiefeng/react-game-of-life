import React from 'react'

class Conway extends React.Component {
  render() {
    return (
      <>
        <h1>Conway's Game of Life</h1>
        <span>Getting Started:</span>
        <ol>
          <li>Below is a 50 x 50 grid.</li>
          <li>Click on individual cell to mark 'alive' or 'dead'.</li>
          <li>Original Rules:</li>
          <ol>
            <li>Any living cell with less than 2 neighbor dies.</li>
            <li>Any living cell with more than 3 neighbor dies.</li>
            <li>Any living cell with exactly 2 or 3 neighbor survives.</li>
            <li>Any dead cell with exactly 3 neighbor come to live.</li>
          </ol>
          <li>Added a wrap around for more interesting effects.</li>
          <li>Use `Start` button to start simulation.</li>
          <li>Use `Random` button to randomize cell (50%).</li>
          <li>Use `Reset` button to clear grid.</li>
        </ol>
        <span>TODO Improvements:</span>
        <ol>
          <li>Click and drag mouse to toggle cell status. (Clicking is annoying)</li>
          <li>Customize grid size.</li>
          <li>Pre load interesting patterns just for fun.</li>
        </ol>
        <span>A quick fun <a href='https://github.com/cjiefeng/react-game-of-life'>project</a> to learn reactjs. Have fun making one of your own. </span>
        <br />
        <span>More details about Conway's Game of Life <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>here</a>.</span>
        <br />
      </>
    )
  }
}

export default Conway;