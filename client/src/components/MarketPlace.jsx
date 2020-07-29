import React, { useContext } from 'react'
import stateContext from '../internal';

const MarketPlace = () => {
  const { socketFunctions, state, playerId } = useContext(stateContext);
    return (
        <section className="dashboard__market-place">
           <h1>The open market:</h1> 
             <table class="blueTable">
               <thead>
                 <tr>
                   <th>Seller</th>
                   <th>Property</th>
                   <th>Price</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>cell1_1</td>
                   <td>cell2_1</td>
                   <td>cell3_1</td>
                   <td>buy</td>
                   <td>remove</td>
                 </tr>
                 <tr>
                   <td>cell1_2</td>
                   <td>cell2_2</td>
                   <td>cell3_2</td>
                   <td>buy</td>
                   <td>remove</td>
                 </tr>
            </tbody>
          </table>
        </section>
    )
}

export default MarketPlace;