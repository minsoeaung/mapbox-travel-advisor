import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1)
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    loading: {
        height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    },
    container: {
        padding: '25px'
    },
    marginBottom: {
        marginBottom: '30px',
    },
    list: {
        height: '70vh',
        overflow: 'auto',
    },
}));