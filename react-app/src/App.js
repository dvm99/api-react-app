import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GraphAPI from "./APIs/graph/graphAPI";
import RestAPI from "./APIs/rest/restAPI";



export const styles = theme => ({
    '@global': {
        body: {
            background: '#282c34',
        },
    },
    appBar: {
        background: '#550055'
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

class App extends React.Component {

    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const {classes} = this.props
        const value = this.state.value;

        return (
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="REST"/>
                        <Tab label="GraphQL"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <RestAPI/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GraphAPI/>
                </TabPanel>
            </div>
        );
    }
}

export default withStyles(styles)(App);