package com.example.demo;

import com.example.demo.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:4200")  // Move to class level
public class ItemController {

    private final ItemService itemService;
    private final ItemRepository itemRepository;  // Add final

    @Autowired
    public ItemController(ItemService itemService, ItemRepository itemRepository) {  // Inject both dependencies
        this.itemService = itemService;
        this.itemRepository = itemRepository;
    }

    @GetMapping  // Remove "/api/items" as it's already in @RequestMapping
    public ResponseEntity<List<Item>> getItems() {
        List<Item> items = itemService.findAll();
        System.out.println(items);
        return ResponseEntity.ok().body(items);
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item savedItem = itemRepository.save(item);
        return ResponseEntity.ok().body(savedItem);
    }

    @PutMapping("/{id}/increment")
    public ResponseEntity<Item> incrementCount(@PathVariable Long id) {
        return itemRepository.findById(id)
            .map(item -> {
                item.setCount(item.getCount() + 1);
                Item updatedItem = itemRepository.save(item);
                return ResponseEntity.ok(updatedItem);
            })
            .orElseThrow(() -> new RuntimeException("Item Not Found"));
    }

    @PutMapping("/{id}/decrement")
    public ResponseEntity<Item> decrementCount(@PathVariable Long id) {
        return itemRepository.findById(id)
            .map(item -> {
                item.setCount(item.getCount() - 1);
                Item updatedItem = itemRepository.save(item);
                return ResponseEntity.ok(updatedItem);
            })
            .orElseThrow(() -> new RuntimeException("Item Not Found"));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setDescription(updatedItem.getDescription());
                    item.setCount(updatedItem.getCount());
                    Item savedItem = itemRepository.save(item);
                    return ResponseEntity.ok().body(savedItem);
                })
                .orElseThrow(() -> new RuntimeException("Item Not Found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}