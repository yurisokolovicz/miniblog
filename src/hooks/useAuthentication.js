import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

import { db } from '../firebase/config';
import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false);

    // O objeto auth é criado usando a função getAuth() do Firebase. Esse objeto será utilizado para chamar as funções de autenticação.
    const auth = getAuth();
    // A função checkIfIsCancelled é definida para verificar se a operação de autenticação foi cancelada. Se o estado cancelled for verdadeiro, a função retorna imediatamente, interrompendo a execução de operações subsequentes.
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    /////////////////// REGISTER ///////////////////
    // A função createUser é definida como uma função assíncrona que recebe um objeto data contendo informações do usuário, como email, password e displayName.
    const createUser = async data => {
        // Antes de iniciar a operação de criação do usuário, a função verifica se a operação foi cancelada.
        checkIfIsCancelled();
        // Em seguida, define o estado loading como verdadeiro para indicar que uma operação de autenticação está em andamento e limpa o estado error definindo-o como nulo.
        setLoading(true);
        setError(null);

        try {
            // Dentro de um bloco try-catch, a função utiliza a função createUserWithEmailAndPassword do Firebase para criar um usuário com o email e a senha fornecidos.
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // Em seguida, utiliza a função updateProfile do Firebase para atualizar o perfil do usuário com o displayName fornecido.
            await updateProfile(user, {
                displayName: data.displayName
            });
            // Após a conclusão bem-sucedida da operação, define o estado loading como falso e retorna o objeto user.
            setLoading(false);

            return user;
        } catch (error) {
            // Em caso de erro, a função captura a exceção no bloco catch e trata o erro, definindo a mensagem de erro apropriada no estado error.
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes('Password')) {
                systemErrorMessage = 'Password must be at least 6 characters long';
            } else if (error.message.includes('email-already-in-use')) {
                systemErrorMessage = 'Email already in use';
            } else {
                systemErrorMessage = 'Something went wrong';
            }

            setError(systemErrorMessage);
        }
        setLoading(false);
    };
    // Cleanup, prevent memory leaks. Increase performance.
    // Em seguida, é declarado um efeito utilizando a função useEffect. O efeito é executado apenas uma vez, quando o componente é montado, e retorna uma função que será executada quando o componente for desmontado. Essa função define o estado cancelled como verdadeiro, evitando possíveis vazamentos de memória.

    /////////////////// LOGOUT ///////////////////
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    /////////////////// LOGIN ///////////////////
    const login = async data => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'User not found';
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'Wrong password';
            } else {
                systemErrorMessage = 'Something went wrong';
            }

            setError(systemErrorMessage);
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    }, []);
    // Por fim, o gancho useAuthentication retorna um objeto contendo as seguintes propriedades:
    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
};

// auth: objeto auth criado anteriormente, fornecido pelo Firebase. Ele pode ser utilizado para acessar outras funcionalidades de autenticação do Firebase, além das fornecidas pelo gancho useAuthentication.
// createUser: função assíncrona que realiza o processo de criação de um novo usuário, utilizando o email e a senha fornecidos. Essa função retorna o objeto user em caso de sucesso.
// error: estado que armazena informações sobre erros de autenticação. Pode ser nulo ou conter uma mensagem de erro.
// loading: estado que indica se uma operação de autenticação está em andamento. Pode ser verdadeiro ou falso.
// O gancho useAuthentication encapsula a lógica de autenticação usando o Firebase e fornece uma interface simples para lidar com operações de autenticação, como criação de usuários. Ele também gerencia estados relacionados à autenticação, como erros e carregamento, facilitando a utilização desses dados em componentes React.
