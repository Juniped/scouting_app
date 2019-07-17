import React, { Component } from 'react';

import { withStyles} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const rawStyles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class RawData extends Component{
    render(){
        const { classes } = this.props;
        return(
            <Box>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.heading}>Raw Pitch Data</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        );
    }
}

export default withStyles(rawStyles)(RawData);