import React, { Component } from "react";
// Import the module
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class SimplePopover extends Component {
  render() {
    const { popoverOpen } = this.state;

    return (
      <div>
        // Using the module's component
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="mypopover"
          toggle={this.togglePopover}
        >
          <PopoverHeader>This is popover title</PopoverHeader>
          <PopoverBody>This is simple popover content</PopoverBody>
        </Popover>
      </div>
    );
  }
}
export default SimplePopover;
