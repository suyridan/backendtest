export interface ResponseDTO<T> {
    registros:T[],
    num_registros: number,
    pagina: number,
    num_registros_por_pagina: number
  }
  
