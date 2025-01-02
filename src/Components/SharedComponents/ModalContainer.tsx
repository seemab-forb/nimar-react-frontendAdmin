function ModalContainer({ children }: { children: React.ReactNode }) {
  // return <div className="absolute inset-0 p-6 bg-black/50">{children}</div>;
  return (
    <div className="w-full bg-black/70 fixed z-[50] inset-0 p-6 overflow-hidden">
      {children}
    </div>
  );
}
export default ModalContainer;
