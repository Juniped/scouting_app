
import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        overflowX: 'auto',
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: "#fb4f14",
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    table: {
        minWidth: 550,
    },
});

function L6Line(props) {
    return (
        <TableRow>
            <TableCell>{props.value['pitch']}</TableCell>
            <TableCell>{props.value['swing']}</TableCell>
            <TableCell>{props.value['result']}</TableCell>
            <TableCell>{props.value['diff']}</TableCell>
            <TableCell>{props.value['change']}</TableCell>
        </TableRow>
    );
}

class Last6Table extends Component {
    getLines() {
        let d = [];
        for (let i = 0; i < this.props.pitch_data.length; i++) {
            d.push(
                <L6Line value={this.props.pitch_data[i]} key={i} />);
        }
        return d;
    }
    render() {
        const loading = this.props.loading;
        let body = loading ?
            (<div className="has-text-centered">
            </div>) :
            (
                <Table size="small" padding="checkbox" hover="true" stripedRows>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pitch</TableCell>
                            <TableCell>Swing</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Diff</TableCell>
                            <TableCell>Change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.getLines()}
                    </TableBody>
                </Table>
            );
        return (
            <div>{body}</div>
        );
    }
}

class LastSix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pitch_data: [],
            loading: true,
        }
        this.getL6 = this.getL6.bind(this);
        this.addData = this.addData.bind(this);
    }
    componentDidMount() {
        this.getL6();
    }
    componentDidUpdate(prevProps) {
        if (this.props.player !== prevProps.player) {
            this.getL6();
        }
    }
    getL6() {
        this.setState({ loading: true, pitch_data: [] });
        if (this.props.player === undefined) {
            return;
        }
        let player_name = encodeURIComponent(this.props.player.trim());
        let url = this.props.api_url + "/api/info/l6/" + player_name;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const pitch_data = this.state.pitch_data.slice();
                let new_pitches = [];
                for (let i = 0; i < result.length; i++) {
                    let res = result[i];
                    new_pitches.push(res);
                }
                this.setState({
                    pitch_data: pitch_data.concat(new_pitches),
                    loading: false,
                });
            })
            .catch(() => {
                console.log('Request Swallowed!');
            });
    }
    addData(i) {
        const pitch_data = this.state.pitch_data.slice();
        let new_data = []
        new_data.push(i);
        this.setState({
            pitch_data: pitch_data.concat(new_data),
        });
    }
    render() {
        const loading = this.state.loading;
        let body = loading ?
            (<div className="has-text-centered">
            </div>) :
            (
                <div>
                    <h3>Last 6 Pitch Trends</h3>
                    <Last6Table loading={this.state.loading} pitch_data={this.state.pitch_data} />
                </div>
            )
        return (
            <div>{body}</div>
        );
    }
}
export default withStyles(useStyles)(LastSix);
