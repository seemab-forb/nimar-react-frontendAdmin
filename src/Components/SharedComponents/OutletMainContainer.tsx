function OutletMainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-rows-1 p-6 overflow-hidden bg-gray-100">
      <div className="h-full">{children}</div>
    </div>
  );
}
export default OutletMainContainer;
