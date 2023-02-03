function errorMessage(error: string) {
  if (
    error ===
    'duplicate key value violates unique constraint "rooms_url_room_key"'
  ) {
    return "Ese nombre ya existe. Prueba con otro";
  }
  return "Algo salió mal. Inténtalo de nuevo";
}

export { errorMessage };
