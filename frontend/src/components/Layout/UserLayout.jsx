import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch cart when component mounts or when user/guestId changes
    dispatch(fetchCart({ 
      userId: user?._id, 
      guestId 
    }));
  }, [dispatch, user, guestId]);

  return (
    <>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main>
        <Outlet/>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
};
export default UserLayout;
