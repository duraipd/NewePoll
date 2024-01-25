package com.ePoll.service; 
import java.util.List;
import java.util.Objects;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ePoll.model.CatsUsers;
import com.ePoll.repository.CatsUsersRepository;
 
@Service
public class CatsUsersServiceImpl implements CatsUsersService {
 
	@Autowired
	private CatsUsersRepository catsUsersRepo;
	int count = 0;
 
	@Override
	public String userIDValidation(CatsUsers user) {
	    List<CatsUsers> allUsers = catsUsersRepo.findAll();
	    int size = allUsers.size();
	    System.out.println("Username: " + user.getUser_Name() + " Password: " + user.getPassword());
 
	    boolean isValid = false;
 
	    for (CatsUsers storedUser : allUsers) {
	        if (Objects.equals(user.getUser_Name(), storedUser.getUser_Name())
	                && Objects.equals(user.getPassword(), storedUser.getPassword())) {
	            isValid = true;
	            
	            break;
	        }
	    }
 
	    if (isValid) {
	        System.out.println("Valid credentials");
	        count = 0;
	        return "Welcome";
	        
	    } else {
	        count++;
	       
	        if (count>= 4) {
	        	System.out.println("Wait for 10 seconds....");
	        	return "waittt Creditenial";
	            
	        }
	    }
		return "invaild credtinal";
	    
	}
}
 