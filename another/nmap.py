# from nmap3 import *
import nmap3 as nmap
import sys
target = sys.argv[1] or "scanme.nmap.org"
nm = nmap.Nmap()
nm.target = target

print(sys.argv, target, type(target), nm.target)
nm.scan_top_ports('')
# scanned = nm.nmap_version_detection("scanme.nmap.org")
# print(scanned)
# nm = nmap.
# nm.scan(sys.argv)
