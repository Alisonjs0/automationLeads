export function validarCelular(celular: string): boolean {
    const numeros = celular.replace(/\D/g, '');

    if (numeros.length !== 11) {
        return false;
    }

    if (numeros[2] !== '9') {
        return false;
    }

    return true;
}

export function formatarCelular(celular: string): string {
    const numeros = celular.replace(/\D/g, '');

    const ddd = numeros.slice(0, 2);
    const parte1 = numeros.slice(2, 7);
    const parte2 = numeros.slice(7, 11);

    return `(${ddd}) ${parte1}-${parte2}`;
}