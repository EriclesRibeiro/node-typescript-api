function verifyEmptyObject(obj: object): boolean {
    const keys = Object.keys(obj)

    if (keys.length > 0) return false

    return true
}

export default verifyEmptyObject