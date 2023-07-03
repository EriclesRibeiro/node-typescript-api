function mongoURI() {
    // Mongo structure
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URI } = process.env

    // Replace dos dados de autenticação do mongo na uri
    const structure = MONGO_URI?.
        replace('<username>', MONGO_USERNAME as string).
        replace('<password>', MONGO_PASSWORD as string)

    return structure
}

export default mongoURI