package Ic2ExpReactorPlanner;

/**
 * Represents a thick neutron reflector.
 * @author Brian McCloud
 */
public class ThickNeutronReflector extends NeutronReflector {
    
    /**
     * The filename for the image to show for the component.
     */
    private static final String imageFilename = "reactorReflectorThick.png";     //NOI18N
    
    public static final MaterialsList MATERIALS = new MaterialsList(4, NeutronReflector.MATERIALS, 5, java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("COPPER"));
    
    /**
     * Creates a new instance.
     */
    public ThickNeutronReflector() {
        setImage(TextureFactory.getImage(imageFilename));
        setMaxDamage(40000);
        automationThreshold = 41000;
    }
    
    /**
     * Gets the name of the component.
     * @return the name of this component.
     */
    @Override
    public String toString() {
        return java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("THICK NEUTRON REFLECTOR");
    }
    
    @Override
    public MaterialsList getMaterials() {
        return MATERIALS;
    }
    
}
