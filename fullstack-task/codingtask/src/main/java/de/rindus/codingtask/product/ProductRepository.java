package de.rindus.codingtask.product;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by: phil on 11.08.17.
 */
public interface ProductRepository extends MongoRepository<Product, String> {
	
	@Query("{ 'category' : {$regex: ?0, $options: 'i'} }")
	public List<Product> findProductsByCategory(String category);
}
