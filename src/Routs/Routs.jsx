import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Rider from "../Pages/Rider/Rider";
import Error from "../Pages/Error/Error";
import SendParcel from "../Pages/sendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/my-parcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/payment-history/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/Payment/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/users-management/UsersManagement";
import PrivateRout from "./PrivateRout";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/assign-riders/AssignRiders";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "about",
                Component: AboutUs,
            },
            {
                path: "send-parcel",
                element:
                    <PrivateRout>
                        <SendParcel></SendParcel>
                    </PrivateRout>,
                loader: () => fetch('/warehouses.json')
            },
            {
                path: "rider",
                element:
                    <PrivateRout>
                        <Rider></Rider>
                    </PrivateRout>,
                loader: () => fetch('/warehouses.json')

            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch('/warehouses.json')
            },

        ]
    },
    {
        path: "auth",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRout>
            <DashboardLayout></DashboardLayout>
        </PrivateRout>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'users-management',
                element:
                    <AdminRoute>
                        <UsersManagement></UsersManagement>
                    </AdminRoute>
            },
            {
                path: 'approve-riders',
                element:
                    <AdminRoute>
                        <ApproveRiders></ApproveRiders>
                    </AdminRoute>
            },
            {
                path: 'assign-riders',
                element:
                    <AdminRoute>
                        <AssignRiders></AssignRiders>
                    </AdminRoute>
            },
            {
                path: "payment/:parcelId",
                Component: Payment
            },
            {
                path: "payment-success",
                Component: PaymentSuccess
            },
            {
                path: "payment-cancel",
                Component: PaymentCancelled
            },
        ]
    }
])