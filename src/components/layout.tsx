import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="flex-1 p-20">{children}</main>
    </div>
  );
};

export default Layout;
