from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://www.google.com")
assert "Google" in driver.title
elem = driver.find_element(By.NAME, "q")
elem.clear()
elem.send_keys("Instagram login")
elem.send_keys(Keys.RETURN)
driver.get("http://www.instagram.com")
time.sleep(3)
assert "No results found." not in driver.page_source
driver.close()