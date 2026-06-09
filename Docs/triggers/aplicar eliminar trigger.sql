CREATE TRIGGER trigger_cliente_eliminado
AFTER DELETE ON clientes
FOR EACH ROW
EXECUTE FUNCTION log_cliente_eliminado();