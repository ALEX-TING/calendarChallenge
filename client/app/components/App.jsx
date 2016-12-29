import React from 'react';
import { render } from 'react-dom';
import Calendar from './Calendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processedBlocks: null,
    }
  }

  componentWillMount() {
    // get eventsObj from Firebase on component mount
    $.get('https://appcues-interviews.firebaseio.com/calendar/events.json')
      .done((eventsObj) => {
        // process eventsObj into an array of events sorted by start time
        const events = [];
        const grouped = _.map(eventsObj, (event, key) => {
          let obj = {
            eventHash: key,
            start: event.start,
            end: event.end,
            leftIndex: 0,
            columns: 1,
          };
          return obj;
        });
        for (let event in grouped) {
          events.push(grouped[event]);
        }
        const sorted = events.slice().sort((a,b) => {
          return a.start - b.start;
        })

        // process sorted events into blocks of overlapping events
        const blocks = this.processOverlaps(sorted);
        // process blocks to add leftIndexes
        const processedBlocks = this.processBlocks(blocks);
        this.setState({processedBlocks: processedBlocks});
      })

  }
  // takes sorted events arr and processes into blocks of overlapping events
  processOverlaps(eventsArr) {
    let memo = [eventsArr[0]];
    let blocks = [];
    let blockCounter = 0;
    let columnCounter = 1;
    let latestEnd = eventsArr[0].end
    for (let i = 1; i < eventsArr.length; i++) {
      let currentEvent = eventsArr[i];
      let lastEvent = eventsArr[i-1];
      let lastEventEnd = memo[memo.length-1].end;

      if (currentEvent.start < lastEventEnd) {
        columnCounter++;
        memo.push(currentEvent);
        latestEnd = Math.max(latestEnd, currentEvent.end);
      }

      if (currentEvent.start > lastEventEnd && currentEvent.start < latestEnd) {
        memo.push(currentEvent);
        latestEnd = Math.max(latestEnd, currentEvent.end);
      }

      if (currentEvent.start > latestEnd) {
        blocks[blockCounter] = {
          'block': memo,
          'columns': columnCounter
        };
        memo = [eventsArr[i]];
        blockCounter++;
        columnCounter = 1;
        latestEnd = currentEvent.end;
      }

      else {
        blocks[blockCounter] = {
          'block': memo,
          'columns': columnCounter
        };
      }

    }
    return blocks;
  }

  // takes each block of overlapping events and adds left indexes for column positioning
  processBlocks(blocksArr) {
    let processedBlocks = [];
    blocksArr.forEach((blockObj) => {
      const block = blockObj.block;
      if (block.length === 1) {
        processedBlocks.push(block[0]);
      } else {
        block[0].columns = blockObj.columns;
        processedBlocks.push(block[0]);
        for (let i = 1; i < block.length; i++) {
          const currEvent = block[i];
          currEvent.columns = blockObj.columns;
          for (let j = 0; j < i; j++) {
            if (currEvent.start < block[j].end) {
              currEvent.leftIndex++;
            }
          }
          processedBlocks.push(currEvent);
        }
      }
    });
    return processedBlocks;
  }

  render() {
    return(
      <div>
        <h1>Appcues Calendar Challenge</h1>
        <table>
          <tbody>
            <tr>
              <td id='timeColumn'>
                <div className='hourDiv'>
                  <div className='hourLabel'>9:00 <span className='ampm'>AM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>9:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>10:00 <span className='ampm'>AM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>10:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>11:00 <span className='ampm'>AM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>11:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>12:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>12:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>1:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>1:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>2:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>2:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>3:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>3:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>4:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>4:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>5:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>5:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>6:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>6:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>7:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>7:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>8:00 <span className='ampm'>PM</span></div>
                </div>
                <div className='halfDiv'>
                  <div className='halfLabel'>8:30</div>
                </div>
                <div className='hourDiv'>
                  <div className='hourLabel'>9:00 <span className='ampm'>PM</span></div>
                </div>
              </td>
              <td id='calendar'>
                <Calendar
                  processedBlocks = {this.state.processedBlocks}
                />
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  };
}

export default App;
