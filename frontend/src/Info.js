import React, { Component } from 'react';
import Table from '@material-ui/core/table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Line(props) {
    if (props.value['inning'] === "Innings"){
        return(null)
    }
    return (
        <TableRow>
            <TableCell>{props.value['player_name']}</TableCell>
            <TableCell>{props.value['inning']}</TableCell>
            <TableCell>{props.value['outs']}</TableCell>
            <TableCell>{props.value['pitch']}</TableCell>
            <TableCell>{props.value['swing']}</TableCell>
            <TableCell>{props.value['difference']}</TableCell>
            <TableCell>{props.value['result']}</TableCell>
        </TableRow>
    );
}

class PitchInfo extends Component{
    getLines() {
        let d = [];
        for(let i=0; i < this.props.examples.length; i++){
            let id = this.props.examples[i]['id'];
            d.push(
                <Line 
                    value={this.props.examples[i]} 
                    key={id} 
                    onClick={() => this.props.onClick(id)}/>);
        }
        return d;
    }
    render() {
        const loading = this.props.loading;
        let body = loading ?
            (<div className="has-text-centered">
                <br />
                <i className="fas fa-spinner icon fa-spin is-large has-text-info" />
            </div>) : 
            (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Inning</TableCell>
                        <TableCell>Outs</TableCell>
                        <TableCell>Pitch</TableCell>
                        <TableCell>Swing</TableCell>
                        <TableCell>Difference</TableCell>
                        <TableCell>result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>            
                    {this.getLines()}
                </TableBody>
            </Table>
            );
        return(
            <div>{body}</div>
        );
    }
}


class Info extends Component{
    constructor(props){
        super(props);
        this.state = {
            examples: [],
            loading: true,
        };
        this.sleep = this.sleep.bind(this);
        this.getData = this.getData.bind(this);
        this.addData = this.addData.bind(this);
    }
    componentDidMount(){
        // Ensure mounting before accessing API
        this.getData();
    }
    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
    getData(){
        this.setState({loading:true});
        let url = "http://localhost:5000/info";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    const examples = this.state.examples.slice()
                    let new_data = []
                    for(let i = 0; i < result.length; i++) {
                        let res = result[i];
                        new_data.push(res)
                    }
                    this.setState({
                        examples: examples.concat(new_data),
                        loading: false,
                    });
                },
            )
            .catch(() => {
                console.log('Swallowed!')
            });
    }
    addData(i) {
        const examples = this.state.examples.slice();
        let new_data = []
        new_data.push(i);
        this.setState({
            examples: examples.concat(new_data),
        });
    }
    render(){
        return(
            <div>
                <PitchInfo 
                    loading={this.state.loading} 
                    examples={this.state.examples}
                />
            </div>
            
        )
    }
}

export default Info;