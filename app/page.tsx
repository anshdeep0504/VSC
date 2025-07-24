export default function Home() {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 400,
      color: '#6a9955',
      fontSize: 22,
      fontWeight: 500,
      opacity: 0.7,
      letterSpacing: 0.5,
    }}>
      Welcome to VS Code-like Frontend
      <div style={{ color: '#9cdcfe', fontSize: 16, marginTop: 8, opacity: 0.8 }}>
        Select a file from the sidebar to view its contents.
      </div>
    </div>
  );
}
