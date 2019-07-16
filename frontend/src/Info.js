import React, { Component } from 'react';
import Table from '@material-ui/core/table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from '@material-ui/styles/withStyles';

function Cell(props){
    // console.log(props.value);
    let val = props.value;
    let colorStyle = {backgroundColor:"#FFFFFF"};
    if (val === 1){
        colorStyle = {backgroundColor:"#EEEEEE"};
    } else if (val === 2){
        colorStyle = {backgroundColor:"#DDDDDD"};
    } else if (val === 3){
        colorStyle = {backgroundColor:"#CCCCCC"};
    }else if (val === 4){
        colorStyle = {backgroundColor:"#BBBBB"};
    }
    

    return(
        <TableCell style={colorStyle}>{props.value}</TableCell>
    );
}

function Line(props) {
    function getCell(value){
        console.log(value);
        return (
            <Cell value={value}/>
        )
    }
    return (
        <TableRow>
            <TableCell>{props.value['range']}</TableCell>

            {getCell(props.value['HR'])}
            {getCell(props.value['3B'])}
            {getCell(props.value['2B'])}
            {getCell(props.value['1B'])}
            {getCell(props.value['BB'])}
            {getCell(props.value['FO'])}
            {getCell(props.value['K'])}
            {getCell(props.value['PO'])}
            {getCell(props.value['LGO'])}
            {getCell(props.value['RGO'])}
            {getCell(props.value['IBB'])}
        </TableRow>
    );
}

class PitchInfo extends Component{
    // constructor(props){
    //     super(props);   
    
    // }
    getLines() {
        // console.log(this.props);
        let d = [];
        for(let i=0; i < this.props.pitch_data.length; i++){
            let id = this.props.pitch_data[i]['id'];
            d.push(
                <Line 
                    value={this.props.pitch_data[i]} 
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
                <h1>LOADING . . . .</h1>
                {/* <i className="fas fa-spinner icon fa-spin is-large has-text-info" /> */}
            </div>) : 
            (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Range</TableCell>
                        <TableCell>HR</TableCell>
                        <TableCell>3B</TableCell>
                        <TableCell>2B</TableCell>
                        <TableCell>1B</TableCell>
                        <TableCell>BB</TableCell>
                        <TableCell>FO</TableCell>
                        <TableCell>K</TableCell>
                        <TableCell>PO</TableCell>
                        <TableCell>LGO</TableCell>
                        <TableCell>RGO</TableCell>
                        <TableCell>IBB</TableCell>

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

class PitchMatrix extends Component{
    constructor(props){
        super(props);
        this.state = {
            pitch_data: [],
            loading: true,
        }
        this.getMatrix = this.getMatrix.bind(this);
        this.addData = this.addData.bind(this);
    }
    componentDidMount(){
        this.getMatrix();
    }
    getMatrix(){
        this.setState({loading:true});
        let player_name = encodeURIComponent(this.props.player.trim());
        let url = "http://localhost:5000/info/matrix/" + player_name;
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            const pitch_data = this.state.pitch_data.slice();
            let new_pitches = [];
            for(let i = 0; i < result.length; i++){
                let res = result[i];
                console.log(res)
                new_pitches.push(res);
            }
            // console.log(new_pitches);
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
    render(){
        return(
            <div className="Pitch Matrix Root">
                <PitchInfo loading={this.state.loading} pitch_data={this.state.pitch_data}/>
            </div>
        )
    }


}

// class ProspectData extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             examples: [],
//             loading: true,
//         };
//         this.sleep = this.sleep.bind(this);
//         this.getData = this.getData.bind(this);
//         this.addData = this.addData.bind(this);
//     }
//     componentDidMount(){
//         // Ensure mounting before accessing API
//         this.getData();
//     }
//     sleep(milliseconds) {
//         var start = new Date().getTime();
//         for (var i = 0; i < 1e7; i++) {
//           if ((new Date().getTime() - start) > milliseconds){
//             break;
//           }
//         }
//       }
//     getData(){
//         this.setState({loading:true});
//         let url = "http://localhost:5000/info";
//         fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }).then((res) => res.json())
//             .then(
//                 (result) => {
//                     console.log(result)
//                     const examples = this.state.examples.slice()
//                     let new_Data = []
//                     for(let i = 0; i < result.length; i++) {
//                         let res = result[i];
//                         new_data.push(res)
//                     }
//                     this.setState({
//                         examples: examples.concat(new_data),
//                         loading: false,
//                     });
//                 },
//             )
//             .catch(() => {
//                 console.log('Swallowed!')
//             });
//     }
//     addData(i) {
//         const examples = this.state.examples.slice();
//         let new_data = []
//         new_data.push(i);
//         this.setState({
//             examples: examples.concat(new_data),
//         });
//     }
//     render(){
//         return(
//             <div>
//                 <PitchInfo 
//                     loading={this.state.loading} 
//                     examples={this.state.examples}
//                 />
//             </div>
            
//         )
//     }
// }

class Info extends Component {
    render(){
        return(
            <div className="Info">
                {/* <h1> Coming Soon</h1> */}
                <PitchMatrix player="Lefty Louis" />
            </div>
        )
    }
}

export default Info;