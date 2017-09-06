package de.rindus.codingtask.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.validation.constraints.NotNull;


@RestController
@RequestMapping(path = "store")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("search/{filter}")
    public List<Product> search(@PathVariable String filter) {

    	List<Product> lstProducts = new ArrayList<Product>();
    	
    	if (filter != null && !filter.isEmpty() && !"ALL".equalsIgnoreCase(filter)) {
    		lstProducts = productRepository.findProductsByCategory(filter);
    	} else {
    		lstProducts = productRepository.findAll();
    	}
		
    	lstProducts.sort(Comparator.comparing(Product::getName));
    	return lstProducts;

    }
    
    @PostMapping("product/update")
	public Product updateProduct(@RequestBody @NotNull Product pto) {
    	
    	if (pto.getId() != null) {
    		System.out.println("Update: " + pto.getId());
    		Product updatedProduct = productRepository.findOne(pto.getId());
    		updatedProduct.setName(pto.getName());
    		updatedProduct.setAmount(pto.getAmount());
    		updatedProduct.setCategory(pto.getCategory());
    		return productRepository.save(updatedProduct);
    	}
    	System.out.println("Save");
        return productRepository.save(pto);
	}
    
    @GetMapping("product/detail/{id}")
    public Product detailProduct(@PathVariable("id") @NotNull String id) {
    	return productRepository.findOne(id);
    }
    
    @DeleteMapping("product/delete/{id}")
	public void deleteProduct(@PathVariable("id") @NotNull String id) {
   		productRepository.delete(id);
	}    
}
