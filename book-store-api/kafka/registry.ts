import { SchemaRegistry, readAVSCAsync } from '@kafkajs/confluent-schema-registry';

const registry = new SchemaRegistry({
    host: "http://localhost:8085",
});

const registerSchema = async () => {
    try {
        const schema = await readAVSCAsync('./avro/schema.avsc');
        const { id } = await registry.register(schema);
        return id;
    } catch (error) {
        console.log(error);
    }
}

export { registerSchema, registry };