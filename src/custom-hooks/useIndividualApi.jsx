import React, { useState, useEffect }  from 'react'
import { useSnackbar } from '../context/SnackBarContext';

const useIndividualApi = (uri) => {

    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);

    const snackbar = useSnackbar();

    const getIndividualPost = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setItems(data);
            setLoading(false);
        } catch (error) {
            snackbar(error.message);
            setLoading(false);
        }
    }


    useEffect(() => {
        getIndividualPost(uri);
    }, [])

    return {items, loading}
}

export default useIndividualApi