import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { apiService } from '../../services/api';

const GoogleCallbackHandler: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const userDataStr = searchParams.get('user');

        if (token && userDataStr) {
            try {
                const userData = JSON.parse(decodeURIComponent(userDataStr));

                // Use apiService methods to set token and user in storage
                apiService.setToken(token);
                apiService.setUser(userData);

                // Update context
                // NOTE: Our useAuth's setUser will effectively update the context 
                // AND ideally we should have a method in AuthContext to complete the login
                setUser(userData);

                // Refresh the page or navigate. 
                // Since many components rely on the context which is initialized from storage, 
                // a window.location.href might be cleaner to ensure everything is in a fresh state,
                // but navigate("/") should also work if we manually update the state.

                window.location.href = "/";
            } catch (err) {
                console.error("Failed to parse Google user data", err);
                navigate("/login?error=google_parse_failed");
            }
        } else {
            navigate("/login?error=google_missing_data");
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-4xl"></i>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Finishing Google Login...</p>
            </div>
        </div>
    );
};

export default GoogleCallbackHandler;
