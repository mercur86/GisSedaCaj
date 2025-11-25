import React from 'react';
import { Query } from 'react-apollo';
import NavbarMenu from './NavbarMenu';
import { MENU_PRINCIPAL } from '../../graphql/queries';

export default () => {
    return (
        <Query
            query={MENU_PRINCIPAL}
            variables={{ todos: false }}
        >
            {({ data, loading, error }) => {

                if (loading) return (<div className="text-center text-white">
                    <i className="fas fa-spinner fa-spin fa-xs text-white ml-2" />
                </div>);

                if (error) return (<span>
                    <i className="fas fa-times-circle fa-xs text-danger ml-2" />
                        El Menú no se pudo cargar
                </span>);

                const menus = data.sistema.menuPrincipal.filter(m => m.opciones.length !== 0);
                return <NavbarMenu menus={menus} />
            }}
        </Query>
    );
}