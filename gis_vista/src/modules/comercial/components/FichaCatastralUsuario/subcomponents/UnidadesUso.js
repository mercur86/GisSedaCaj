import React from 'react';

export default ({
    data: { unidades_uso }
}) => {

    return (
        <table className="table table-sm mt-2">
            <thead>
                <tr>
                    <th>N° UU</th>
                    <th>Categoría</th>
                    <th>Habitantes</th>
                    <th>Id CIUU</th>
                    <th>Descripción CIUU</th>
                    <th>Nombre Comercial</th>
                </tr>
            </thead>
            <tbody>
                {unidades_uso.map((e, index) => {
                    return (
                        <tr key={index}>
                            <td>{e.v_num_unidad_uso}</td>
                            <td>{e.v_desc_categoria}</td>
                            <td>{e.v_num_habitantes_uu}</td>
                            <td>{e.v_id_ciuu_t}</td>
                            <td>{e.v_desc_ciuu}</td>
                            <td>{e.v_nombre_comercial}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
};