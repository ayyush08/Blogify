import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { persistor } from '@/store/store'; // Assuming your persistor is in redux store
import { useSessionValidator } from '@/hooks/user.hook'; // Assuming this is where you fetch session validation data
import UniversalLoader from '@/components/ui/UniversalLoader'; // Assuming this is your loader component
import { toast } from 'react-hot-toast'; // Assuming you're using toast

const useSession = () => {
    const { data, isLoading } = useSessionValidator(); // Fetch session validation state
    const navigate = useNavigate();

    useEffect(() => {
        // Only proceed if the loading is done
        if (!isLoading) {
            // If no session data exists, navigate to login
            if (!data) {
                toast.error('Please login to continue'); // Show a toast message (optional)
                // persistor.purge(); // Purge redux persist storage (clear auth state)
                navigate('/login', { replace: true }); // Use replace to avoid navigation stack issues
            }
        }
    }, [data, isLoading, navigate]);

    return { isLoading, data };
};

export default useSession;
