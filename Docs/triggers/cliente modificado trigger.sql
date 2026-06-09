CREATE OR REPLACE FUNCTION log_cliente_modificado()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO registro_auditoria (tabla_afectada, id_registro, accion, fecha)
    VALUES ('clientes', NEW.id, 'UPDATE', NOW());
    
    RETURN NEW; -- En UPDATE se retorna NEW
END;
$$ LANGUAGE plpgsql;