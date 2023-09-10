function errorMessage(error: string) {
  if (
    error ===
    'duplicate key value violates unique constraint "rooms_url_room_key"'
  ) {
    return "Ese nombre ya existe. Prueba con otro";
  } else if (
    error.includes("is not a valid URL") ||
    error.includes("Unsupported URL")
  ) {
    return "Esa URL no es válida. Prueba con otra";
  }
  return "Algo salió mal. Inténtalo de nuevo";
}

export { errorMessage };
