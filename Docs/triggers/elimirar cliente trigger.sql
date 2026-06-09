CREATE OR REPLACE FUNCTION log_cliente_eliminado()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO registro_auditoria (tabla_afectada, id_registro, accion, fecha)
    VALUES ('clientes', OLD.id, 'DELETE', NOW());
    
    RETURN OLD; -- En DELETE se retorna OLD
END;
$$ LANGUAGE plpgsql;