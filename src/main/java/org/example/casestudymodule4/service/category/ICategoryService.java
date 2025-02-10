package org.example.casestudymodule4.service.category;

import org.example.casestudymodule4.model.Category;
import org.example.casestudymodule4.service.IGenericService;
import org.springframework.data.domain.Page;

public interface ICategoryService extends IGenericService<Category> {
    Page<Category> getCategoriesWithPagination(int page, int size);

}
