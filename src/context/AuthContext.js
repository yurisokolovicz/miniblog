import { useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
    return useContext(AuthContext);
}

// A primeira linha importa as funções useContext e createContext do módulo 'react'.

// Em seguida, é criado um objeto AuthContext usando a função createContext(). Esse contexto será responsável por fornecer o estado de autenticação para os componentes que o utilizarem.

// A função AuthProvider é exportada como um componente React. Essa função recebe dois parâmetros: children e value. O parâmetro children representa os componentes filhos que serão envolvidos pelo contexto de autenticação, enquanto o parâmetro value representa o valor do estado de autenticação que será fornecido aos componentes filhos.

// Dentro da função, é retornado o componente <AuthContext.Provider>, que envolve children. Ele é responsável por fornecer o valor do estado de autenticação para os componentes filhos que estão dentro dele.

// A função useAuthValue é exportada como um gancho personalizado (custom hook). Essa função utiliza a função useContext(AuthContext) para obter o valor atual do contexto de autenticação. Ela retorna esse valor, permitindo que outros componentes acessem e utilizem o estado de autenticação.
