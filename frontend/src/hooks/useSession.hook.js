import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store'; // Assuming your persistor is in redux store
import { useSessionValidator } from '../hooks/useSessionValidator'; // Assuming this is where you fetch session validation data
import UniversalLoader from '@/components/ui/UniversalLoader'; // Assuming this is your loader component

const useSession = () => {
    const { data, isLoading } = useSessionValidator();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!data) {
                // Optionally show a toast message
                // toast.error('Please login to continue');
                persistor.purge();
                navigate('/login');
            } else {
                console.log('User is logged in');
            }
        }
    }, [data, isLoading, navigate]);

    return { isLoading, data };
};

export default useSession;
