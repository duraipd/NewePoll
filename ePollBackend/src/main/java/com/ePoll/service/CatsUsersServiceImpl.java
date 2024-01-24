package com.ePoll.service;

import java.util.List;
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
	public CatsUsers userIDValidation(CatsUsers g) {
		List<CatsUsers> findAll = catsUsersRepo.findAll();
		int size = findAll.size();

		for (int i = 0; i < findAll.size(); i++) {

			if (g.getUser_Name().equals(findAll.get(i).getUser_Name())
					&& (g.getPassword().equals(findAll.get(i).getPassword()))) {
				System.out.println("valid");
				count = 0;
				break;
			} else {
				if (size == i + 1) {
					count = count + 1;

					if (count >= 3) {
						System.out.println("wait for 10 sec....");
					}
				}
			}

		}
		return null;
	}

	@Override
	public List<CatsUsers> getalldeta() {
		// TODO Auto-generated method stub
		return null;
	}

}
