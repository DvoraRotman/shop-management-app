const getAvailablePort = async (startPort) => {
    const net = require('net');
    
    const isPortAvailable = (port) => {
        return new Promise((resolve) => {
            const server = net.createServer();
            
            server.once('error', () => {
                resolve(false);
            });
            
            server.once('listening', () => {
                server.close();
                resolve(true);
            });
            
            server.listen(port);
        });
    };
    
    let port = startPort;
    while (!(await isPortAvailable(port))) {
        port++;
    }
    
    return port;
};

module.exports = { getAvailablePort };
