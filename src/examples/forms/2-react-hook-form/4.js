/* Core */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Components */
import { Input, Select } from './components';

/* Instruments */
import { options, schema } from './config';

const Form = () => {
    const form = useForm({
        mode:          'onTouched',
        resolver:      yupResolver(schema),
        defaultValues: {
            email:    '',
            password: '',
            account:  'google',
        },
    });

    const submitForm = form.handleSubmit(() => {
        console.log(form.getValues());
        console.log(form.getValues('email'));
        console.log(form.getValues(['email', 'password']));

        form.reset();
    });

    useEffect(() => {
        form.setFocus('email');
    }, []);

    console.log('🖥 Рендер.');

    return (
        <form onSubmit = { submitForm }>
            <h1>Логин</h1>

            <Input
                label = 'Электропочта'
                error = { form.formState.errors.email }
                type = 'email'
                autoComplete = 'email'
                register = { form.register('email') } />

            <Input
                label = 'Пароль'
                error = { form.formState.errors.password }
                type = 'password'
                autoComplete = 'current-password'
                register = { form.register('password') } />

            <Select
                label = 'Аккаунт'
                error = { form.formState.errors.account }
                register = { form.register('account') }
                options = { options } />

            <button type = 'submit'>Войти</button>
        </form>
    );
};

export default Form;
