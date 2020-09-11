"use strict";
const { sequelize } = require("../../database/models");
const url = require("url");

const usePaginator = async (Model, pageSize = 10, req, where = null) => {
    let { page = 1, q } = req.query;

    page = parseInt(page);

    if (page <= 0) {``
        page = 1;
    }

    const options = {
        pageIndex: page - 1,
        pageSize,
        ...where,
    };
 
    console.log(options)

    const pag = await Model.paginate(options);

    //Rename Fields
    renameObj(pag, "entities", "data");
    //current_page   // PAGINA ACTUAL
    renameObj(pag, "pageIndex", "current_page");
    //per_page       // REGISTROS POR PAGINA
    renameObj(pag, "pageSize", "per_page");
    //total          // TOTAL DE REGISTROS
    renameObj(pag, "count", "total");
    //last_page      // NUMERO DE ULTIMA PAGINA VEREMOS
    renameObj(pag, "pageCount", "last_page");

    //PAGINATION FIELDS
    pag.current_page = page;
    //FROM
    pag.from = (pag.per_page * page - pag.per_page) + 1;
    //to
    pag.to = pag.per_page * page > pag.total ? pag.total : pag.per_page * page;
    //first_page_url // LINK DE PRIMERA PAGINA
    pag.first_page_url = getHostUrl(req, 1);
    //next_page_url  // LINK PAGINA SIGUIENTE
    pag.next_page_url  = getHostUrl(req, page + 1, pag.last_page);
    //prev_page_url  // LINK PAGINA ANTERIOR
    pag.prev_page_url  = getHostUrl(req, page - 1);
    //last_page_url  // LINK ULTIMA PAGINA
    pag.last_page_url  = getHostUrl(req, pag.last_page);

    delete pag.orders;

    return pag;
};

const renameObj = (obj, oldName, newName) => {
    if (!obj.hasOwnProperty(oldName)) {
        return false;
    }

    obj[newName] = obj[oldName];
    delete obj[oldName];
    return true;
};

const getHostUrl = (req, page, max_page = null) => {
    if (page === 0) {
        return null;
    }

    if (max_page && page > max_page) {
        return null;
    }

    const params = new URLSearchParams(req.query);
    params.set("page", page);

    return `${req.protocol}://${req.get("host")}${
        req.baseUrl
    }?${params.toString()}`;
};

module.exports = usePaginator;
