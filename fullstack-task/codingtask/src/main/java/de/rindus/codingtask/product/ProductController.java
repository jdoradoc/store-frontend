package de.rindus.codingtask.product;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.validation.constraints.NotNull;



@RestController
@RequestMapping(path = "store")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProductController {
	
	private static final Logger LOGGER = LogManager.getLogger(ProductController.class.getName());

    @Autowired
    private ProductRepository productRepository;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("search/{filter}")
    public ResponseEntity<List<Product>> search(@PathVariable String filter) {
    	
    	LOGGER.info("Search [filter: " + filter + "]");

    	List<Product> lstProducts = new ArrayList<Product>();
    	
    	if (filter != null && !filter.isEmpty() && !"ALL".equalsIgnoreCase(filter)) {
    		lstProducts = productRepository.findProductsByCategory(filter);
    	} else {
    		lstProducts = productRepository.findAll();
    	}
		
    	lstProducts.sort(Comparator.comparing(Product::getName));
    	return new ResponseEntity<List<Product>>(lstProducts, HttpStatus.OK);

    }
    
    @PostMapping("product/update")
	public ResponseEntity<Product> updateProduct(@RequestBody @NotNull Product pto) {
    	
    	if (pto.getId() != null) {
    		LOGGER.info("Update: " + pto.getId());
    		Product updatedProduct = productRepository.findOne(pto.getId());
    		updatedProduct.setName(pto.getName());
    		updatedProduct.setAmount(pto.getAmount());
    		updatedProduct.setCategory(pto.getCategory());
    		updatedProduct = productRepository.save(updatedProduct);
    		return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    	}
    	
    	LOGGER.info("Create: " + pto.getName());
    	Product newProduct = productRepository.save(pto);
        return new ResponseEntity<Product>(newProduct, HttpStatus.OK);
	}
    
    @GetMapping("product/detail/{id}")
    public ResponseEntity<Product> detailProduct(@PathVariable("id") @NotNull String id) {
    	LOGGER.info("Detail: " + id);
    	Product detail = productRepository.findOne(id);
    	return new ResponseEntity<Product>(detail, HttpStatus.OK);
    }
    
    @DeleteMapping("product/delete/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable("id") @NotNull String id) {
    	LOGGER.info("Delete: " + id);
   		productRepository.delete(id);
   		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}    
}
