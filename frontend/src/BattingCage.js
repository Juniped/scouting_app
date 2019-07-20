import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
    }
});


class BattingCage extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.container}>
				
            </div>
        );
    }
}

export default withStyles(styles)(BattingCage);
