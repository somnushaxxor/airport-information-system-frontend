import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function NotificationManager() {

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
}

export function sendError(message) {
    toast.error(message);
}

export function sendSuccess(message) {
    toast.success(message);
}

export const errorMessage = "Something went wrong. Please try again a bit later.";