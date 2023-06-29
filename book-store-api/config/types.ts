const CONTROLLER_TYPES = {
    IBookController: Symbol.for("IBookController"),
    IUserController: Symbol.for("IUserController"),
    ICategoryController: Symbol.for("ICategoryController")
};

const SERVICE_TYPES = {
    IBookService: Symbol.for("IBookService"),
    IUserService: Symbol.for("IUserService"),
    ICategoryService: Symbol.for("ICategoryService")
};

export { SERVICE_TYPES, CONTROLLER_TYPES };