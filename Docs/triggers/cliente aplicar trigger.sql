CREATE TRIGGER trigger_cliente_modificado
AFTER UPDATE ON clientes
FOR EACH ROW
EXECUTE FUNCTION log_cliente_modificado();