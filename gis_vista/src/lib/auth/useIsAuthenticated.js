import { useState, useEffect } from 'react';
import auth from './auth';

const initialState = { authenticated: false, error: null, loading: true };

const useIsAuthenticated = (isPublic) => {
    const [state, setState] = useState(initialState);
    useEffect(() => {
        if (isPublic) {
            auth.login('33333333', '33333333')
            .then(authenticated => {
                setState(prevState => ({ ...prevState, loading: false, authenticated }));
            })
            .catch(error => {
                setState(prevState => ({ ...prevState, loading: false, error }));
            });
        } else {
            auth.isAuthenticated()
            .then(authenticated => setState(prevState => ({ ...prevState, loading: false, authenticated })))
            .catch(error => setState(prevState => ({ ...prevState, loading: false, error })));
        }
    }, []);
    return state;
}

export default useIsAuthenticated;