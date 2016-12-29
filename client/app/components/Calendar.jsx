import React from 'react';
import { render } from 'react-dom';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  // takes each event in processedBlocks and creates an eventBlock div
  createCalendarEvent(event) {
    const pxFromTop = event.start + 'px';
    const height = event.end - event.start + 'px';
    const width = 100/event.columns + '%';
    const left = event.leftIndex/event.columns * 100 + '%';
    const eventBlockStyle = {
      'width': width,
      'height': height,
      'marginTop': pxFromTop,
      'marginLeft': left,
      'backgroundColor': '#ffffff',
      'position': 'absolute',
    };
    return(
      <div
        key={event.eventHash}
        id={event.eventHash}
        className='eventBlock'
        style={eventBlockStyle}>
        <div className='eventName'>Sample Event</div>
        <div className='eventLocation'>Sample Location</div>
      </div>
    )
  }

  render() {
    let eventBlocks;

    if (this.props.processedBlocks) {
      eventBlocks = this.props.processedBlocks.map((event) => {
        return this.createCalendarEvent(event);
      });
    }

    return(
      <div style={{'position': 'relative'}}>
        {eventBlocks}
      </div>
    );
  }
}

export default Calendar;
